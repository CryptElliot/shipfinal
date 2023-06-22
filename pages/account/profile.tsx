import ProtectedPage from '@/layouts/protected-page'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import AccountPageContainer from '@/components/blocks/layout/account-page-container'
import { useUserDetails } from '@/utils/user-context'
import Button from '@/components/atoms/button'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { supportedImageTypes } from '@/utils/supported-image-types'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'
import { FilePondFile } from 'filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Import FilePond plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'

// Register the plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
)

const Profile: React.FC = () => {
  const supabase = useSupabaseClient()
  const [userDetails, setUserDetails] = useUserDetails()
  const initialAvatarUrl = userDetails?.avatar_url
  const [fullName, setFullName] = useState('')
  const [files, setFiles] = useState<FilePondFile[] | any[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', content: '' })
  const { t } = useTranslation('account')

  useEffect(() => {
    setFiles([{
      source: `${userDetails?.avatar_url}?id=${new Date().getTime() / 1000}`,
      options: { type: "remote" },
    }])
    setFullName(userDetails?.full_name ?? '')
  }, [userDetails])

  const handleUserDetailsSave = async (evt) => {
    evt.preventDefault()
    setLoading(true)
    let publicUrl = initialAvatarUrl
    if (files.length > 0) {
      const file = (files[0] as FilePondFile).file
      const fileName = Buffer.from(userDetails.id.replaceAll('-', ''), 'base64').toString('base64')
      const filePath = `public/${fileName}${supportedImageTypes.find(t => t.mimeType === file.type)?.extension}`
      const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(
          filePath,
          file,
          { upsert: true })

      if (!uploadError) {
        const { data } = supabase
          .storage
          .from('avatars')
          .getPublicUrl(filePath)
        publicUrl = data.publicUrl
      }
    }

    const { error: saveError } = await supabase
      .from('user_details')
      .update({
        full_name: fullName,
        avatar_url: publicUrl
      })
      .eq('id', userDetails.id)

    setLoading(false)
    if (saveError) {
      setMessage({ type: 'error', content: t('profile.updateProfileErrorMessage') })
    } else {
      setMessage({ type: 'note', content: t('profile.updateProfileConfirmationMessage') })
      setUserDetails({ ...userDetails, full_name: fullName, avatar_url: publicUrl })
    }
  }
  return (
    <>
      <Head>
        <title>{t('profile.title')}</title>
      </Head>
      <AccountPageContainer>
        <ProtectedPage>
          <div className="min-h-full flex flex-col justify-center pt-6 pb-16 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold">{t('profile.heading')}</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleUserDetailsSave} className="space-y-6">
                  <div className='mx-auto flex justify-center -mb-4'>
                    <FilePond
                      className='h-32 w-32'
                      allowImagePreview
                      files={files as string[]}
                      acceptedFileTypes={supportedImageTypes.map(t => t.mimeType)}
                      imagePreviewMaxFileSize='2MB'
                      onupdatefiles={(files) => setFiles(files)}
                      name="avatarUrl"
                      labelIdle='Drag & drop your image or <span class="filepond--label-action">browse</span>'
                      imagePreviewHeight={100}
                      stylePanelLayout='compact circle'
                      styleLoadIndicatorPosition='center bottom'
                      styleButtonRemoveItemPosition='center bottom'
                    />
                  </div>

                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                      {t('profile.fullNameLabel')}
                    </label>
                    <input
                      id="full-name"
                      name="full-name"
                      autoComplete='Name'
                      type='text'
                      className='default-input'
                      required
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                    />
                  </div>

                  <div>
                    <Button
                      type="submit"
                      loading={loading}
                      className='default-button'
                      disabled={loading}>
                      {t('profile.saveProfileButton')}
                    </Button>
                  </div>
                </form>

                {
                  message.content &&
                  <div className={`${message.type === 'error' ? 'text-red-400' : 'text-gray-400'} text-center pt-6`}>
                    {message.content}
                  </div>
                }
              </div>
            </div>
          </div>
        </ProtectedPage>
      </AccountPageContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'account'])),
    },
  }
}

export default Profile

import { Fragment, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Listbox, Transition } from '@headlessui/react'

const localeItems = [
  {
    locale: 'en',
    image: <Image
      src='/images/uk-flag.png'
      height={20}
      width={33.33}
      alt='english locale'
    />,
  },
  {
    locale: 'de',
    image: <Image
      src='/images/german-flag.png'
      height={20}
      width={33.33}
      alt='german locale'
    />,
  },
  {
    locale: 'fr',
    image: <Image
      src='/images/french-flag.png'
      height={20}
      width={33.33}
      alt='french locale'
    />,
  },
]

export default function LocaleSwitch() {
  const router = useRouter()
  const [selected, setSelected] = useState(localeItems.find(i => i.locale === router.locale) ?? localeItems[0])
  return (
    <Listbox
      value={selected}
      onChange={setSelected}
    >
      <div className="relative w-8">
        <Listbox.Button className="relative cursor-default rounded-lg py-2">
          <span className="block truncate">{selected.image}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-16 overflow-auto rounded-md bg-white py-1 shadow-lg focus:outline-none -ml-4 z-10">
            {
              localeItems.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className='relative cursor-default select-none flex justify-center items-center'
                  value={item}
                >
                  <Link
                    href={router.asPath}
                    locale={item.locale}
                    className='py-2 px-3'
                  >
                    {item.image}
                  </Link>
                </Listbox.Option>
              ))
            }
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

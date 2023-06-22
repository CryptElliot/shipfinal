import { CSSProperties } from 'react'
import Loader from './loader'

type ButtonProps = {
  children: JSX.Element | JSX.Element[] | string
  type: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

export default function Button({
  children,
  type,
  loading,
  disabled,
  className,
  style,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      style={{
        ...style
      }}
      {...rest}
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}>
      {
        !loading &&
        <>{children}</>
      }
      {
        loading &&
        <i>
          <Loader />
        </i>
      }
    </button>
  )
}

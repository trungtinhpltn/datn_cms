export interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
}

export const Heading1 = ({ children, className, ...rest }: HeadingProps) => (
  <h1 className={`text-4xl font-medium leading-none ${className}`} {...rest}>
    {children}
  </h1>
)
export const Heading2 = ({ children, className, ...rest }: HeadingProps) => (
  <h2 className={`text-3xl font-medium leading-none ${className}`} {...rest}>
    {children}
  </h2>
)
export const Heading3 = ({ children, className, ...rest }: HeadingProps) => (
  <h3 className={`text-2xl font-medium leading-none ${className}`} {...rest}>
    {children}
  </h3>
)
export const Heading4 = ({ children, className, ...rest }: HeadingProps) => (
  <h4 className={`text-xl font-medium leading-none ${className}`} {...rest}>
    {children}
  </h4>
)
export const Heading5 = ({ children, className, ...rest }: HeadingProps) => (
  <h5 className={`text-lg font-medium leading-none ${className}`} {...rest}>
    {children}
  </h5>
)
export const Heading6 = ({ children, className, ...rest }: HeadingProps) => (
  <h6 className={`font-medium leading-none ${className}`} {...rest}>
    {children}
  </h6>
)

export type GlobalNavItem = {
  label: string
  href: string
  exact?: boolean
}

export type IsActive = {
  pathname: string
  href: string
  exact?: boolean
}

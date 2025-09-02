export type NavItem = {
  label: string
  href: string
  exact?: boolean
}

export type IsActive = {
  pathname: string
  href: string
  exact?: boolean
}

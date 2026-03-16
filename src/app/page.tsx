import { redirect } from 'next/navigation'

// Redirect bare "/" to the default French locale
export default function RootPage() {
  redirect('/fr')
}

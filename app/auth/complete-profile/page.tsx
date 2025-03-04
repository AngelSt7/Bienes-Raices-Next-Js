import CompleteAccountForm from '@/src/components/auth/complete-account/CompleteAccountForm'
import { userGetInfo } from '@/src/services/client/user/UserGetInfo'
import { serverGetCookie } from '@/src/utils/backend/cookiesUtils'
import { redirect } from 'next/navigation'

export default async function page() {
  const token = await serverGetCookie()
  const user = await userGetInfo({token})
  if(!user) redirect('/auth/login')

  return <CompleteAccountForm user={user} />
  
}

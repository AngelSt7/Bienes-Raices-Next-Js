import UserForm from "@/src/components/darshboard/user/UserForm"
import { userGetInfo } from "@/src/services/client/user/UserGetInfo"
import { serverGetCookie } from "@/src/utils/backend/cookiesUtils"

export default async function page() {
    const token = await serverGetCookie()
    const user = await userGetInfo({token})
    console.log(user)
    if(user)return (
        <div className=" w-11/12 max-w-[1200px] mx-auto">
            <UserForm user={user} />
        </div>
    )
}


import ConfirmAccount from '@/src/components/auth/confirm-account/ConfirmAccount';
import { redirect } from 'next/navigation';

export default async function page({ params }: { params: { token: string } }) {
    const paramsUrl = await params
    const token = paramsUrl ? Number(paramsUrl.token) : NaN;

    if (isNaN(token)) return redirect('/404');

    if (token.toString().length !== 6) return redirect('/404');

    if (typeof token == 'number' && token.toString().length == 6) return (
       <ConfirmAccount token={token.toString()} />
    )
}

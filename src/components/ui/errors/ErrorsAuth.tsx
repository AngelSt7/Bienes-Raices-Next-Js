export default function ErrorsAuth({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-red-500 font-medium text-xs">{children}</p>
    )
}

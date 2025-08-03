import { cn } from '../lib/utils'
import Image from 'next/image'

export const Logo = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <Image
            src="/surti.png"
            alt="Logo Surti"
            width={100}
            height={100}
            className={className}
            priority
        />
    )
}

export const LogoIcon = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <Image
            src="/surti.png"
            alt="Logo Surti"
            width={100}
            height={100}
            className={className}
            priority
        />
    )
}

export const LogoStroke = ({ className }: { className?: string }) => {
    return (
        <Image
            src="/surti.png"
            alt="Logo Surti"
            width={100}
            height={100}
            className={className}
            priority
        />
    )
}

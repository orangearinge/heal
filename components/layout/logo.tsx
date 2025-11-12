
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string; }) => {
    return (
        <div className="flex items-center gap-4">
            <span className='font-mono  font-bold '>Heal</span>
        </div>
    )
}

export const LogoIcon = ({ className }: { className?: string; }) => {
    return (
        <span className='font-mono  font-bold '>Heal</span>
    )
}

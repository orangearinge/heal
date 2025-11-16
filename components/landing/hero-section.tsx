import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

export default function HeroSection() {
    return (

        <div className="overflow-hidden min-h-screen pt-44 relative">
            <Image
                alt="Heal - Asisten Kesehatan Pribadi Anda"
                src="/hero.webp"
                fill
                priority
                className="object-cover p-2 rounded-4xl "
            />


            <div className="relative mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                    <h1 className="text-white mt-8 max-w-2xl text-balance text-5xl md:text-6xl lg:mt-16 xl:text-7xl ">Cara baru untuk hidup <span className='italic'>sehat</span></h1>
                    <p className=" text-white mt-8 max-w-xl text-balance text-lg">Hidup sehat lebih mudah dengan asisten cerdas yang memahami tubuhmu.</p>
                    <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                        <SignedOut>
                            <SignInButton mode='modal'>
                                <Button
                                    size="lg"
                                    variant={"default"}
                                    className="h-12 rounded-full pl-5 pr-3 dark">

                                    <span className="group relative text-nowrap">Coba sekarang</span>
                                    <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </SignInButton>

                        </SignedOut>
                        <SignedIn>
                            <Button
                                asChild
                                size="lg"
                                variant={"default"}
                                className="h-12 rounded-full pl-5 pr-3 dark">
                                <Link href="/chat">
                                    <span className="group relative text-nowrap">Coba sekarang</span>
                                    <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Button>

                        </SignedIn>
                    </div>
                </div>
            </div>

        </div>
    )
}
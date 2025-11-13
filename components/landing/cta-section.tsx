import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CTASection() {
    return (
        <section className="py-16">
            <div className="mx-5 rounded-3xl  px-6 py-12 md:py-20 lg:py-32">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-normal lg:text-5xl">Get started
                        Ready to optimize your health?</h2>

                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg"
                            className='rounded-full'
                        >
                            <Link href="/">
                                <span>Get Started</span>
                            </Link>
                        </Button>


                    </div>
                </div>
            </div>
        </section>
    )
}
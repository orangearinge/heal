import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function ContactSection() {
    return (
        <section className="py-32">
            <div className="mx-auto max-w-4xl px-4 lg:px-0">
                <h2 className=" font-normal text-center text-3xl pt-14 lg:pt-0 lg:text-5xl pb-20">
                    Hubungi {" "}
                    <span className='text-[#2d94b3]'>Kami</span>
                </h2>
                <div className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0">
                    <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
                        <div>
                            <h2 className="mb-3 text-lg font-semibold">Kolaborasi</h2>
                            <Link
                                href="mailto:hello@tailus.io"
                                className="text-lg text-[#2d94b3] hover:underline">
                                hello@truehealness.com                            </Link>
                            <p className="mt-3 text-sm">+62 8121 3323 323</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
                        <div>
                            <h3 className="mb-3 text-lg font-semibold">Media / Press</h3>
                            <Link
                                href="mailto:press@tailus.io"
                                className="text-lg text-[#2d94b3] hover:underline ">
                                press@truehealness.com
                            </Link>
                            <p className="mt-3 text-sm">+62 2323 4324 123</p>
                        </div>
                    </div>
                </div>

                <div className="h-3 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
                <form
                    action=""
                    className="border px-4 py-12 lg:px-0 lg:py-24">
                    <Card className="mx-auto max-w-lg p-8 sm:p-16">


                        <h3 className="text-xl font-semibold">Kami ingin mendengar dari Anda.</h3>
                        <p className="mt-4 text-sm">Hubungi tim penjualan kami! Kami ingin belajar lebih banyak tentang bagaimana Anda berniat menggunakan aplikasi kami.</p>

                        <div className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="space-y-2">
                                    Nama Lengkap
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="email"
                                    className="space-y-2">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="msg"
                                    className="space-y-2">
                                    Message
                                </Label>
                                <Textarea
                                    id="msg"
                                    rows={3}
                                />
                            </div>
                            <Button>Submit</Button>
                        </div>
                    </Card>
                </form>
            </div>
        </section>
    )
}
import { motion } from 'framer-motion'

export default function StatsSection() {
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-4xl font-medium lg:text-5xl">Surti in Numbers</h2>
                        <p>Surti is a Web3 survey-to-earn platform that rewards users every time they complete a survey.</p>
                    </motion.div>
                </div>

                <div className="grid gap-12 divide-y *:text-center md:grid-cols-4 md:gap-6 md:divide-x md:divide-y-0">
                    <div className="space-y-4">
                        <div className="text-4xl font-bold">9,235+</div>
                        <p>Active Users</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-4xl font-bold">89,230+</div>
                        <p>Surveys Completed</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-4xl font-bold">2.4M+</div>
                        <p>Tokens Distributed</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-4xl font-bold">340+</div>
                        <p>Projects Served</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

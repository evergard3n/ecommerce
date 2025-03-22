import { poppins } from "@/app/layout"
export default function Recommended() {
    return (
        <h1 className={`${poppins.className} antialiased text-zinc-500 text-5xl font-bold`}>
            <span className="text-black">Personalized Picks.</span> <br></br>
            Just for you.
        </h1>
    )
}
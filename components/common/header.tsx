import Link from "next/link"
import { FileText } from "lucide-react"
import Navlink from "./navlink"
import { SignedIn,SignedOut,UserButton } from "@clerk/nextjs"

export default function Header(){

    
    return(
        <nav className="cointainer flex items-center justify-between">
            <div>
            <Navlink href="/" className="flex item-center gap-1 lg:gap-2 shrink-0">
                <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200
                ease-in-out"/>
                SummarAIze
               </Navlink>
            </div>
            <div>
                <Navlink href="/#pricing">Pricing</Navlink>
            </div>

            <div>
                <SignedIn>
                <Navlink href="/dashboard">Your Summaries</Navlink>
                </SignedIn>
            </div>
            
            
                <SignedIn>
                <div>
                        <Navlink href="/upload">Upload a PDF</Navlink>
                        <div>Pro</div>
                        <SignedIn>
                           <UserButton />
                        </SignedIn>

                    </div>
                </SignedIn>
            <SignedOut>     
                <Navlink href="/sign-in">Sign In</Navlink>
            </SignedOut>

            {/* <div>
               { isLogin? <Link href="/sign-out">Sign Out</Link>:
                <Navlink href="/sign-in">Sign In</Navlink>}
            </div> */}
        </nav>
    )
}


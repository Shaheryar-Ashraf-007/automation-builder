import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return <SignIn appearance={{ baseTheme: dark ,
    variables: {
          colorBackground: "#18181b", // dark card background
          colorInputBackground: "#27272a", // dark input background
          colorText: "#fff", // white text
        },
  }} />
}
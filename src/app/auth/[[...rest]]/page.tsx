import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SignIn, SignUp } from "@clerk/nextjs";
import BottomGradient from "~/components/background/bottom-gradient";
import Stars from "~/components/background/stars";

async function AccessPage({ searchParams }: Readonly<{  searchParams: Promise<{mode?: string}>}>) {
  const {mode} = await searchParams;
  const defaultTab = mode === "signin" ? "signin" : "signup";

  return (
    <>
      <Stars count={60} />
      <BottomGradient />
      <div className="flex min-h-screen w-full items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border border-slate-700 bg-slate-800/50 backdrop-blur-md hover:border-slate-700/70 hover:bg-slate-800/70">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              Welcome to CoonSpace!
            </CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-slate-600"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-slate-600"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-4 px-1">
                <SignIn
                  appearance={{
                    elements: {
                      card: {
                        background: "transparent !important",
                        paddingTop: "0",
                        border: "none !important",
                        boxShadow: "none !important",
                      },
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      footer: {
                        background: "transparent",
                      },
                      footerAction: "hidden",
                    },
                  }}
                />
              </TabsContent>

              <TabsContent value="signup" className="mt-4 px-1">
                <SignUp
                  appearance={{
                    elements: {
                      card: {
                        background: "transparent !important",
                        paddingTop: "0",
                        border: "none !important",
                        boxShadow: "none !important",
                      },
                      main: "gap-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      footer: {
                        background: "transparent",
                      },
                      footerAction: "hidden",
                    },
                  }}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default AccessPage;

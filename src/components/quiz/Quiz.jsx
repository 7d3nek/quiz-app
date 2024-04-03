import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QuizContent from "./QuizContent";

const queryClient = new QueryClient();

export default function Quiz({ url }) {
    return(
        <QueryClientProvider client={queryClient}>
            <QuizContent url={url} />
        </QueryClientProvider>
    );
}
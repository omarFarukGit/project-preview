import { CreateSubmissionForm } from "@/components/form/create-submission-form";


export default function CreateSubmissionPage() {
  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Create Submission
        </h1>
        <p className="text-muted-foreground mt-2">
          Share your project details and submit it for review.
        </p>
      </div>

      <div >
        <CreateSubmissionForm />
      </div>
    </main>
  );
}

import { Card, isCategoryKey } from "@gf/components/Card";
import { PageProps } from "@utils/types";

export default async function MeineKarte({ searchParams }: PageProps) {
  const { title, body, optional, category } = await searchParams;

  return (
    <div className="">
      <Card
        className="mx-auto mt-[5vh] max-w-[90vw] max-h-[90vh] "
        title={title}
        body={body}
        optional={optional}
        category={isCategoryKey(category) ? category : undefined}
      />
    </div>
  );
}

// meine-karte?title=Schicke%20eine%20Karte!&body=Schicke%20den%20Menschen%20mit%20denen%20du%20Karten%20hersellst%20eine%20Karte!%0A%0AUm%20ihnen%20zu%20zeigen,%20dass%20du%20mal%20wieder%20alles%20over-engineerst.%0A%0A...und%20du%20sie%20lieb%20hast!&optional=Schick%20auch%20du%20jetzt%20eine%20Gedankenfluss-Karte.&category=dankbarkeit

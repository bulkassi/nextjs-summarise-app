import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockHistory = [
  {
    id: "HIS-001",
    url: "https://youtu.be/design-talk",
    summary: "Short note about the design talk video.",
    href: "/history/1",
  },
  {
    id: "HIS-002",
    url: "https://youtu.be/product-update",
    summary: "Brief summary of the product update clip.",
    href: "/history/2",
  },
  {
    id: "HIS-003",
    url: "https://youtu.be/podcast-ep",
    summary: "Quick recap of the podcast episode.",
    href: "/history/3",
  },
];

export default function History() {
  return (
    <div className="flex min-h-[calc(100dvh-8rem)] w-full items-start justify-center px-4 py-12">
      <div className="w-full max-w-5xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Summary history
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Each card represents a processed link alongside its condensed recap.
            These entries are placeholder data until the backend feeds live
            content.
          </p>
        </div>

        <div className="rounded-xl border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm font-semibold">Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistory.map((item) => (
                <TableRow key={item.id} className="bg-background">
                  <TableCell className="p-0 align-top">
                    <Link href={item.href} className="block">
                      <Card className="rounded-none border-0 border-b border-border/40 gap-0 py-0 transition-colors last:border-b-0 hover:bg-muted/40">
                        <CardHeader className="space-y-1 px-4 py-3 pb-1">
                          <CardTitle className="text-sm font-medium">
                            {item.url}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 pt-1">
                          <p className="text-sm text-muted-foreground">
                            {item.summary}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

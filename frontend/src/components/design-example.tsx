import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DesignExample() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Inputs</h2>
        <div className="flex flex-col gap-4 max-w-sm">
          <Input placeholder="Default input" />
          <Input placeholder="Disabled input" disabled />
          <div className="flex gap-2">
            <Input placeholder="With button" />
            <Button>Search</Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This is a simple card with just a title and some content.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Card input" />
              <Button className="w-full">Card Action</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

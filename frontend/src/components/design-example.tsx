import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DesignExample() {
  return (
    <div className="p-6 space-y-8">
      {/* Buttons Section */}
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

      {/* Form Elements Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Inputs</h3>
            <div className="space-y-4">
              <Input placeholder="Default input" />
              <Input placeholder="Disabled input" disabled />
              <div className="flex gap-2">
                <Input placeholder="With button" />
                <Button>Search</Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Textarea</h3>
            <Textarea placeholder="Type your message here" />
          </div>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Avatars</h2>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="pending">Pending</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </div>

      {/* Cards Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Promoter</p>
                  <p className="text-sm text-muted-foreground">Festival Organizer</p>
                </div>
                <Badge variant="pending">New Message</Badge>
              </div>
              <Textarea placeholder="Type your reply..." className="mt-4" />
              <Button className="w-full">Send Reply</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Summer Festival</p>
                  <p className="text-sm text-muted-foreground">Central Park, NYC</p>
                </div>
                <Badge variant="success">Confirmed</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Club Night</p>
                  <p className="text-sm text-muted-foreground">Club Nebula</p>
                </div>
                <Badge variant="pending">In Progress</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

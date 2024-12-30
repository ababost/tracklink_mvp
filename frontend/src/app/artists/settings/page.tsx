import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const mockProfile = {
  name: 'DJ Pulse',
  email: 'djpulse@example.com',
  phone: '+1 234 567 8900',
  genre: 'Electronic/House',
  location: 'New York, NY',
  bio: 'Electronic music producer and DJ with 5 years of experience in the industry. Known for energetic sets and unique sound design.',
  socialMedia: {
    instagram: '@djpulse',
    twitter: '@djpulse',
    soundcloud: 'djpulse',
  },
  ratePerHour: '$200',
  minimumDuration: '2 hours',
};

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input defaultValue={mockProfile.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue={mockProfile.email} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue={mockProfile.phone} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Genre</label>
                  <Input defaultValue={mockProfile.genre} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input defaultValue={mockProfile.location} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea defaultValue={mockProfile.bio} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram</label>
                  <Input defaultValue={mockProfile.socialMedia.instagram} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Twitter</label>
                  <Input defaultValue={mockProfile.socialMedia.twitter} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">SoundCloud</label>
                  <Input defaultValue={mockProfile.socialMedia.soundcloud} />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rate per Hour</label>
                  <Input defaultValue={mockProfile.ratePerHour} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minimum Duration</label>
                  <Input defaultValue={mockProfile.minimumDuration} />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Notification settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Account settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

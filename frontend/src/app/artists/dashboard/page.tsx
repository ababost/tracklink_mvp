import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockStats = [
  {
    title: 'Total Bookings',
    value: '12',
    description: 'This month',
  },
  {
    title: 'Pending Requests',
    value: '4',
    description: 'Awaiting response',
  },
  {
    title: 'Messages',
    value: '8',
    description: 'Unread',
  },
  {
    title: 'Earnings',
    value: '$4,200',
    description: 'This month',
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity section can be added here */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500">Coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const mockData = {
  overview: {
    totalRevenue: '$45,600',
    averagePerShow: '$1,900',
    totalShows: '24',
    upcomingShows: '6',
    acceptanceRate: '75%',
    topVenue: 'Club Nebula',
  },
  earnings: [
    { month: 'Jan', revenue: 6500, expenses: 1200, profit: 5300 },
    { month: 'Feb', revenue: 7800, expenses: 1400, profit: 6400 },
    { month: 'Mar', revenue: 8900, expenses: 1600, profit: 7300 },
    { month: 'Apr', revenue: 7400, expenses: 1300, profit: 6100 },
    { month: 'May', revenue: 8200, expenses: 1500, profit: 6700 },
    { month: 'Jun', revenue: 9100, expenses: 1700, profit: 7400 },
  ],
  venueTypes: [
    { name: 'Clubs', value: 45 },
    { name: 'Festivals', value: 25 },
    { name: 'Private Events', value: 20 },
    { name: 'Other', value: 10 },
  ],
  popularTimes: [
    { time: '6PM', bookings: 2 },
    { time: '7PM', bookings: 3 },
    { time: '8PM', bookings: 5 },
    { time: '9PM', bookings: 8 },
    { time: '10PM', bookings: 12 },
    { time: '11PM', bookings: 15 },
    { time: '12AM', bookings: 10 },
    { time: '1AM', bookings: 7 },
    { time: '2AM', bookings: 4 },
  ],
  recentBookings: [
    {
      venue: 'Club Nebula',
      date: '2024-03-15',
      revenue: '$2,000',
      status: 'confirmed',
    },
    {
      venue: 'Summer Festival',
      date: '2024-03-20',
      revenue: '$3,500',
      status: 'pending',
    },
    {
      venue: 'Private Event',
      date: '2024-03-25',
      revenue: '$1,500',
      status: 'confirmed',
    },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.totalRevenue}</div>
            <p className="text-xs text-gray-500">Last 6 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average per Show</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.averagePerShow}</div>
            <p className="text-xs text-gray-500">Based on all shows</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acceptance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.acceptanceRate}</div>
            <p className="text-xs text-gray-500">Of booking requests</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="venues">Venues</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData.earnings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      name="Revenue"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      name="Profit"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.recentBookings.map((booking, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{booking.venue}</p>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{booking.revenue}</p>
                        <span 
                          className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockData.venueTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {mockData.venueTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="venues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Performance Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData.popularTimes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Venues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Club Nebula</p>
                    <p className="text-green-600">$12,400</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Beach Club</p>
                    <p className="text-green-600">$8,900</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Sky Lounge</p>
                    <p className="text-green-600">$7,600</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Average Show Duration</p>
                    <p className="font-medium">2.5 hours</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Repeat Booking Rate</p>
                    <p className="font-medium">65%</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Client Satisfaction</p>
                    <p className="font-medium">4.8/5.0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

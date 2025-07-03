
import { Card, CardContent } from "@/components/ui/card";
import { Pen, FileText, Gift, Briefcase, Image, Palette } from "lucide-react";

const CategorySection = () => {
  const categories = [
    {
      icon: Pen,
      title: "Stationery",
      description: "Pens, pencils, notebooks, and writing essentials",
      count: "120+ items",
      color: "bg-blue-500"
    },
    {
      icon: Briefcase,
      title: "Office Supplies",
      description: "Professional office equipment and accessories",
      count: "85+ items",
      color: "bg-green-500"
    },
    {
      icon: Gift,
      title: "Promotional Products",
      description: "Custom branded merchandise and giveaways",
      count: "200+ items",
      color: "bg-purple-500"
    },
    {
      icon: FileText,
      title: "Business Cards",
      description: "Professional business cards and printing",
      count: "50+ designs",
      color: "bg-orange-500"
    },
    {
      icon: Image,
      title: "Free Templates",
      description: "Ready-to-use promotional templates",
      count: "100+ templates",
      color: "bg-teal-500"
    },
    {
      icon: Palette,
      title: "Custom Design",
      description: "Personalized design services",
      count: "Unlimited",
      color: "bg-pink-500"
    }
  ];

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Product Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of business stationery and promotional materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.title} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`${category.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
                      {category.count}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

'use client';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const discoveredProducts = [
  {
    category: "Electronics",
    subCategory: "Smartphones",
    searchCount: 1250,
    addToCartRate: "32%",
    conversionValue: "$45,200",
  },
  {
    category: "Apparel",
    subCategory: "T-Shirts",
    searchCount: 980,
    addToCartRate: "28%",
    conversionValue: "$18,500",
  },
  {
    category: "Footwear",
    subCategory: "Sneakers",
    searchCount: 850,
    addToCartRate: "35%",
    conversionValue: "$38,900",
  },
  {
    category: "Home Decor",
    subCategory: "Candles",
    searchCount: 720,
    addToCartRate: "22%",
    conversionValue: "$12,300",
  },
  {
    category: "Beauty",
    subCategory: "Skincare",
    searchCount: 680,
    addToCartRate: "30%",
    conversionValue: "$21,800",
  },
];

const notFoundProducts = [
  {
    category: "Home Decor",
    subCategory: "Candles",
    mentions: 45,
    characteristics: "Lavender scented, metal jar, minimalist design",
  },
  {
    category: "Electronics",
    subCategory: "Smart Watch",
    mentions: 38,
    characteristics: "Water resistant, fitness tracking, long battery life",
  },
  {
    category: "Apparel",
    subCategory: "Winter Jacket",
    mentions: 32,
    characteristics: "Down filled, waterproof, lightweight, hood",
  },
  {
    category: "Beauty",
    subCategory: "Face Serum",
    mentions: 28,
    characteristics: "Anti-aging, vitamin C, organic, fragrance-free",
  },
];

export const ProductDetails = () => {
  const downloadDiscoveredCSV = () => {
    const headers = ["Product Category", "Product Sub Category", "Search Count", "Add to Cart Rate", "Conversion Value"];
    const rows = discoveredProducts.map(p => [p.category, p.subCategory, p.searchCount, p.addToCartRate, p.conversionValue]);
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products_discovered.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadNotFoundCSV = () => {
    const headers = ["Product Category", "Product Sub Category", "Number of Mentions", "Product Characteristics"];
    const rows = notFoundProducts.map(p => [p.category, p.subCategory, p.mentions, `"${p.characteristics}"`]);
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "products_not_found.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Product Search Analytics</h3>
        <p className="text-sm text-muted-foreground mt-1">Analyze product discovery and gaps in inventory (max 30-day range)</p>
      </div>
      
      <Tabs defaultValue="discovered" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="discovered">Products Discovered</TabsTrigger>
          <TabsTrigger value="not-found">Products Not Found</TabsTrigger>
        </TabsList>

        <TabsContent value="discovered" className="mt-6">
          <div className="flex justify-end mb-4">
            <Button onClick={downloadDiscoveredCSV} size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Category</TableHead>
                  <TableHead>Product Sub Category</TableHead>
                  <TableHead>Search Count</TableHead>
                  <TableHead>Add to Cart Rate</TableHead>
                  <TableHead>Conversion Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discoveredProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{product.category}</TableCell>
                    <TableCell>{product.subCategory}</TableCell>
                    <TableCell>{product.searchCount}</TableCell>
                    <TableCell>{product.addToCartRate}</TableCell>
                    <TableCell>{product.conversionValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="not-found" className="mt-6">
          <div className="flex justify-end mb-4">
            <Button onClick={downloadNotFoundCSV} size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Category</TableHead>
                  <TableHead>Product Sub Category</TableHead>
                  <TableHead>Number of Mentions</TableHead>
                  <TableHead>Product Characteristics</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notFoundProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{product.category}</TableCell>
                    <TableCell>{product.subCategory}</TableCell>
                    <TableCell>{product.mentions}</TableCell>
                    <TableCell className="max-w-xs">{product.characteristics}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

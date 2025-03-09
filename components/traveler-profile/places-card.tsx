import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlacesCard() {
    const places = [
        {
            name: "Mt. Everest | Nepal",
            description: "The highest mountain in the world, located in the Himalayas. Perfect for adventurous travelers.",
            image: "/everest.jpg",
        },
        {
            name: "Santorini | Greece",
            description: "A beautiful Greek island with white-washed buildings, blue domes, and stunning sunsets. Perfect for a romantic vacation.",
            image: "/santorini.jpg",
        },
        {
            name: "Sey Phoksundo Lake | Nepal",
            description: "A pristine lake in the Dolpa region of Nepal. Perfect for trekking and camping.",
            image: "/phoksundo.jpg",
        },
        {
            name: "Banff National Park | Canada",
            description: "A stunning national park in Canada with turquoise lakes, snow-capped mountains, and abundant wildlife. Perfect for outdoor adventures.",
            image: "/banf.jpg",
        }
    ];
    return (
        <div className="flex flex-wrap gap-4 mt-2">
            {places.map((place, index) => (
                <Card key={index} className="w-80 overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48 w-full overflow-hidden">
                        <img
                            src={place.image}
                            alt={place.name}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-xl font-bold">{place.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-sm line-clamp-3">
                            {place.description}
                        </CardDescription>
                    </CardContent>

                    <CardFooter className="pt-0">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            Learn more
                        </button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
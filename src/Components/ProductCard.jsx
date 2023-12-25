import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";

const ProductCard = ({ product }) => {
  const { id } = useParams();
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const loadImage = () => {
      const img = new Image();
      img.src = product.images[0];

      img.onload = () => {
        setImageLoading(false);
      };

      img.onerror = () => {
        setImageLoading(false);
      };
    };

    const delay = setTimeout(() => {
      loadImage();
    }, 1000);

    return () => clearTimeout(delay);
  }, [product.images]);

  return (
    <Card className="relative w-96 m-4">
      <CardHeader shadow={false} floated={false} className="h-96 ">
        {imageLoading ? (
          //  preloader animation
          <div className="h-full w-full flex items-center justify-center">
            <div className="animate-spin rounded-full border-t-4 border-red-600 border-opacity-50 h-16 w-16"></div>
          </div>
        ) : (
          <Carousel className="rounded-xl h-full">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`loading ${index + 1}`}
                className="h-full w-full object-cover"
              />
            ))}
          </Carousel>
        )}
      </CardHeader>
      <CardBody className="h-56">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className=" font-bold w-72">
            {product.title}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${product.price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {product.description}
        </Typography>
      </CardBody>
      <CardFooter className="absolute bottom-0 left-0 right-0 mb-4">
        <Link to={`/cart/${id}`}>
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Cart
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

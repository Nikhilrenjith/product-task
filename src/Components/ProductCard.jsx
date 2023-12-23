import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";

const ProductCard = ({ product }) => {
  return (
    <Card className="relative w-96 m-4 ">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={product.images[0]}
          alt="card"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="h-56">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className=" font-bold w-72 ">
            {product.title}
          </Typography>
          <Typography color="blue-gray" className="font-medium ">
            ${product.price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75 "
        >
          {product.description}
        </Typography>
      </CardBody>
      <CardFooter className="absolute bottom-0 left-0 right-0 mb-4">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

import { CardContent, Typography, Card } from "@mui/material";
import { IProduct } from "../variables/types";

export const Cards = ({ brand, id, price, product }: IProduct) => {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "200px",
          width: "350px",
          '@media (max-width: 400px)': {
            width: "260px",
          },
        }}
      >
        <Typography sx={{ fontSize: 14 }}>
          бренд : {brand || "unknown"}
        </Typography>
        <Typography variant="h6" component="div">
          {product}
        </Typography>
        <div>
          <Typography sx={{ fontSize: 10 }} color="text.secondary">
            ID: {id}
          </Typography>
          <Typography sx={{ fontSize: 24 }}>{price} руб.</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

import { truncateTwoDecimals } from "../utils/numberUtils";

interface TotalDistanceCardProps {
  totalOne: number;
  totalTwo: number;
}

function TotalDistanceCard({ totalOne, totalTwo }: TotalDistanceCardProps) {
  return (
    <>
      <p>Panda Vermelho: {truncateTwoDecimals(totalOne / 1000)} km</p>
      <p>Macaco Bugio: {truncateTwoDecimals(totalTwo / 1000)} km</p>
    </>
  );
}

export default TotalDistanceCard;

import { transformToKm } from "../utils/numberUtils";

interface TotalDistanceCardProps {
  totalOne: number;
  totalTwo: number;
}

function TotalDistanceCard({ totalOne, totalTwo }: TotalDistanceCardProps) {
  return (
    <>
      <p>Panda Vermelho: {transformToKm(totalOne)} km</p>
      <p>Macaco Bugio: {transformToKm(totalTwo)} km</p>
    </>
  );
}

export default TotalDistanceCard;

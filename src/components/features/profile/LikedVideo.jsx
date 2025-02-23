import { useUser } from "../../hooks/useUser";
import ContentCard from "../ContentCard";

export default function LikedVideo() {
    
const { user } = useUser();
console.log(user);


  return (
    <div>
      {/* <ContentCard /> */}
    </div>
  )
}

import Page from "@/components/common/Page/Page";
import Logo from "@/assets/home/laptop.jpg";
import { BoxWithImage } from "@/components/common/Box/Box";

export default function MyConferencePage({
  params,
}: {
  params: { conferenceId: string };
}) {
  return (
    <Page>
      <BoxWithImage
        className="text-darkblue w-[90%] lg:w-[60%]"
        src={Logo}
        alt={"Logo"}
      >
        <h1 className="w-full flex justify-center text-3xl">
          MyConferencePage {params.conferenceId}
        </h1>
        <p className="text-1xl pt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum excepturi aut quam consequuntur perspiciatis officia, omnis
          unde in saepe facere et a dolorem dolores sequi blanditiis nam
          molestiae vero!
        </p>
        <p className="text-1xl pt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum excepturi aut quam consequuntur perspiciatis officia, omnis
          unde in saepe facere et a dolorem dolores sequi blanditiis nam
          molestiae vero!
        </p>
        <p className="text-1xl pt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum excepturi aut quam consequuntur perspiciatis officia, omnis
          unde in saepe facere et a dolorem dolores sequi blanditiis nam
          molestiae vero!
        </p>
        <p className="text-1xl pt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum excepturi aut quam consequuntur perspiciatis officia, omnis
          unde in saepe facere et a dolorem dolores sequi blanditiis nam
          molestiae vero!
        </p>
        <p className="text-1xl pt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum excepturi aut quam consequuntur perspiciatis officia, omnis
          unde in saepe facere et a dolorem dolores sequi blanditiis nam
          molestiae vero!
        </p>
        <p className="text-1xl pt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum excepturi aut quam consequuntur perspiciatis officia, omnis
          unde in saepe facere et a dolorem dolores sequi blanditiis nam
          molestiae vero!
        </p>
        <p className="text-1xl pt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
          voluptatum excepturi aut quam consequuntur perspiciatis officia, omnis
          unde in saepe facere et a dolorem dolores sequi blanditiis nam
          molestiae vero!
        </p>
      </BoxWithImage>
    </Page>
  );
}

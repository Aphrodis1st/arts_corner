import { single_image } from "../assets/images"

const SingleArtsPage = () => {
  return (
    <div className="bg-black text-white px-[5%] mx-auto py-10">
      <div className="flex flex-col px-[20%] mx-auto">
        <h1 className="text-4xl font-black">Title</h1>
        <p className="text-2xl">Description</p>
        <div className="w-full">
            <div className="h-[70vh] w-full">
                <img src={single_image} alt="" className="w-full h-full object-cover"/>
            </div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, facilis quasi quis exercitationem corporis quidem inventore, quos aspernatur ipsa odio quas quaerat aliquid voluptatibus, labore saepe expedita nihil porro id!
            Excepturi nemo blanditiis consequatur autem fugiat ad eum harum voluptas iure illum culpa animi, minus temporibus dolorum? Rem amet, unde dicta, ut voluptatum aliquam accusantium, assumenda nobis corporis officia eos!
            Asperiores vero illum praesentium saepe expedita rem sint, corporis iusto incidunt voluptates esse dicta accusamus deserunt voluptate possimus doloremque, commodi veritatis consequatur minima? Accusamus, numquam debitis fugiat fugit dolore enim!
            Deserunt, voluptatem provident. Dolore officia deserunt laudantium aliquid quo possimus! Animi vel tempora dolor necessitatibus tempore illum explicabo nihil? Praesentium officiis enim labore fugiat inventore nobis fugit in sunt ullam.</p>
        </div>
      </div>
    </div>
  )
}

export default SingleArtsPage

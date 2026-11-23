import DescriptionList from "./DescriptionList.astro"
import Item from "./Item.astro"
import Term from "./Term.astro"
import Description from "./Description.astro"

export { Item, Term, Description }

export default Object.assign(DescriptionList, {
  Item,
  Term,
  Description,
})

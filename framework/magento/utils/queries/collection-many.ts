export const CollectionMany = /* GraphQL */ `
  query CollectionMany($id: Int!) {
    category(id: $id) {
      id
      name
      children {
        children_count
        id
        include_in_menu
        name
        position
        url_path
        url_suffix
      }
      include_in_menu
      url_path
      url_suffix
    }
  }
`

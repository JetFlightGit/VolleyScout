import * as DropdownMenu from "zeego/dropdown-menu";
import RoundBtn from "./RoundBtn";

const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundBtn
          icon={"ellipsis-horizontal"}
          title="More"
          onPress={() => {}}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item key="Favorites">
          <DropdownMenu.ItemTitle>Favorites</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon androidIconName="btn-star" />
        </DropdownMenu.Item>
        <DropdownMenu.Item key="Item 2">
          <DropdownMenu.ItemTitle>Item 2</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="Item 3">
          <DropdownMenu.ItemTitle>Item 3</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;

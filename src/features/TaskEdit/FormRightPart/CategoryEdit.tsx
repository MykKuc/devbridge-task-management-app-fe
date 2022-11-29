import categoryJsonData from '../../../pages/categories/MockCategories.json';
import * as React from 'react';

interface Props {
  category?: string;
  setCategory: Function;
}
export default function CategoryEdit(props: Props) {
  let category = props.category;
  let setCategory = props.setCategory;

  return (
    <div className="d-flex flex-row around justify-content-between ">
      <label>Category</label>
      <select
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        className={'form-select-sm'}
        style={{ margin: '3px' }}
        value={category}
      >
        {categoryJsonData.map((category) => {
          return <option value={category.id}>{category.title}</option>;
        })}
      </select>
    </div>
  );
}

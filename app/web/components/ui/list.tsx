import React, { Fragment } from "react";

interface ListProps<TypeData> {
	data: TypeData[] | undefined;
	render: (item: TypeData, index: number) => React.ReactNode;
	notFound?: React.ReactNode;
}

export const List = <TypeData,>({
	data = [],
	render,
	notFound = <div className="text-center py-4">Data tidak ditemukan</div>,
}: ListProps<TypeData>) => {
	const validData = Array.isArray(data) ? data : [];

	if (validData.length === 0) {
		return notFound;
	}

	return (
		<Fragment>
			{validData.map((item, index) => (
				<React.Fragment key={`item-${index?.toString()}`}>
					{render(item, index)}
				</React.Fragment>
			))}
		</Fragment>
	);
};

export default List;

import React, { Fragment } from "react";

interface ListProps<TypeData> {
	data: TypeData[] | undefined;
	render: (item: TypeData, index: number) => React.ReactNode;
	notFound?: React.ReactNode;
	loading?: boolean;
	skeleton?: number;
	renderSkeleton?: () => React.ReactNode;
}

export const List = <TypeData,>({
	data = [],
	render,
	notFound = <div className="text-center py-4">Data tidak ditemukan</div>,
	loading = false,
	skeleton = 4,
	renderSkeleton,
}: ListProps<TypeData>) => {
	const validData = Array.isArray(data) ? data : [];

	if (loading && renderSkeleton) {
		return (
			<Fragment>
				{Array.from({ length: skeleton }).map((_, index) => (
					<React.Fragment key={`skeleton-${index?.toString()}`}>
						{renderSkeleton()}
					</React.Fragment>
				))}
			</Fragment>
		);
	}

	if (!loading && validData.length === 0) {
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

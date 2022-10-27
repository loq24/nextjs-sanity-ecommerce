import Link from "next/link";
import Image from "next/image";
import { CategorySchema } from "lib/interfaces";
import styles from "styles/components/CategoryList/CategoryItem.module.scss";
import urlFor from "lib/sanity/urlFor";

interface CategoryItemProps {
  category: CategorySchema;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const { featured_image, slug, title, description } = category;
  return (
    <div className={styles.categoryItem}>
      <Link href={`/category/${slug}`}>
        <a className="relative w-full h-full">
          <Image
            src={urlFor(featured_image).url()}
            alt={title}
            quality={100}
            layout="fill"
            className="clickable-img"
          />
          <div className="absolute py-2 px-3  flex flex-col bottom-4 left-4 bg-white text-black">
            <span className="font-semibold capitalize">{title}</span>
            {description && <span className="text-xs">{description}</span>}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CategoryItem;

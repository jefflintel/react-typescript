import { type PropsWithChildren, type FC } from "react"; //best practice to add type decorator

type HeaderProps = PropsWithChildren<{
  image: {
    src: string;
    alt: string;
  };
}>;

const Header: FC<HeaderProps> = ({ image, children }) => {
  return (
    <header>
      <img {...image} />
      {children}
    </header>
  );
};

export default Header;

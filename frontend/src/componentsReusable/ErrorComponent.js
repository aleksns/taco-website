export default function ErrorComponent(props) {
  const { error } = props;
  return <div className="inline-error">{error}</div>;
}

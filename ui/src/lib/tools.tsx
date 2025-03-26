export default function getCurrentDateTime() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:mm
    return localISOTime;
};


export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;

  // Fetch newsletter data based on the ID
  const response = await fetch(`https://api.example.com/newsletters/${id}`);
  const newsletter = await response.json();

  if (!newsletter) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      newsletter,
    },
  };
}
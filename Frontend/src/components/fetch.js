export default function Fetcher(url, cbk)
{
    fetch(url)
      .then((res) =>
        res.json()
      )
      .then((out) =>
        cbk(out)
      )
      .catch((err) =>
        console.error(err)
      );
}

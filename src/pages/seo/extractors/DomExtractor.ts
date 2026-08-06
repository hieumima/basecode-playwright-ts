import { BasePage } from "../../BasePage";

export class DomExtractor extends BasePage {
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getMetaDescription(): Promise<string | null> {
    return await this.getMetaContent("description");
  }

  async getH1Elements(): Promise<string[]> {
    return await this.getAllElementsText("h1");
  }

  async getAllHeadings(): Promise<{ tag: string; text: string }[]> {
    return await this.page.evaluate(() => {
      const headings: { tag: string; text: string }[] = [];
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((el) => {
        headings.push({ tag: el.tagName.toLowerCase(), text: (el.textContent || "").trim() });
      });
      return headings;
    });
  }

  async getImages(): Promise<{ src: string; alt: string | null }[]> {
    return await this.page.evaluate(() => {
      return Array.from(document.querySelectorAll("img")).map((img) => {
        return {
          src: img.getAttribute("src") || (img as HTMLImageElement).currentSrc || "",
          alt: img.getAttribute("alt")
        };
      });
    });
  }

  async getInternalLinks(): Promise<{ href: string; text: string }[]> {
    const currentHost = new URL(this.getCurrentUrl()).hostname;
    return await this.page.evaluate((host) => {
      return Array.from(document.querySelectorAll("a[href]"))
        .filter((a) => {
          const href = a.getAttribute("href") || "";
          try {
            const url = new URL(href, window.location.origin);
            return url.hostname === host || href.startsWith("/") || href.startsWith("#");
          } catch { return href.startsWith("/") || href.startsWith("#"); }
        })
        .map((a) => {
          let text = (a.textContent || "").trim();
          if (!text) {
            const img = a.querySelector("img");
            if (img) text = (img.getAttribute("alt") || "").trim();
          }
          if (!text) {
            text = (a.getAttribute("aria-label") || "").trim();
          }
          return { href: a.getAttribute("href") || "", text };
        });
    }, currentHost);
  }

  async getExternalLinks(): Promise<{ href: string; text: string; rel: string | null }[]> {
    const currentHost = new URL(this.getCurrentUrl()).hostname;
    return await this.page.evaluate((host) => {
      return Array.from(document.querySelectorAll("a[href]"))
        .filter((a) => {
          const href = a.getAttribute("href") || "";
          try {
            const url = new URL(href, window.location.origin);
            return url.hostname !== host && !href.startsWith("/") && !href.startsWith("#");
          } catch { return false; }
        })
        .map((a) => {
          let text = (a.textContent || "").trim();
          if (!text) {
            const img = a.querySelector("img");
            if (img) text = (img.getAttribute("alt") || "").trim();
          }
          if (!text) {
            text = (a.getAttribute("aria-label") || "").trim();
          }
          return { href: a.getAttribute("href") || "", text, rel: a.getAttribute("rel") };
        });
    }, currentHost);
  }

  async getCanonicalUrl(): Promise<string | null> {
    return await this.page.evaluate(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link ? link.getAttribute("href") : null;
    });
  }

  async getRobotsContent(): Promise<string | null> {
    return await this.getMetaContent("robots");
  }

  isHttps(): boolean {
    return this.getCurrentUrl().startsWith("https://");
  }

  async getMixedContent(): Promise<string[]> {
    if (!this.isHttps()) return [];
    return await this.page.evaluate(() => {
      const mixed: string[] = [];
      document.querySelectorAll("img[src], script[src], link[href], iframe[src], video[src], audio[src], source[src]").forEach((el) => {
        const url = el.getAttribute("src") || el.getAttribute("href") || "";
        if (url.startsWith("http://")) mixed.push(url);
      });
      return mixed;
    });
  }
}

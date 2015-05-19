package com;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RetrieveData extends HttpServlet {

	private static final String FOLDER = StoreLevel.FOLDER_CORE+"simulated\\";

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		File folder = new File(FOLDER);
		File[] files = folder.listFiles();
		
		if(files.length > 0)
		{
			File f= files[0];
			FileReader fr = new FileReader(f);
			BufferedReader bfr = new BufferedReader(fr);
			
			StringBuffer sBuf = new StringBuffer();
			String l;
			while((l = bfr.readLine()) != null)
			{
				sBuf.append(l);
			}
			
			bfr.close();
			fr.close();

			String clientOrigin = req.getHeader("origin");
			
			String ipAddress = req.getHeader("x-forwarded-for");
			resp.setHeader("Access-Control-Allow-Origin", clientOrigin);
			resp.setHeader("Access-Control-Allow-Methods", "GET");
			resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
			resp.setHeader("Access-Control-Max-Age", "86400");

			resp.getWriter().print(sBuf.toString());
			

		}
	}
}

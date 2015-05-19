package com;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class StoreLevel extends HttpServlet {

	public static final String FOLDER_CORE = "C:\\Users\\ashrinagar\\Dropbox\\Box2dWeb-2.1a.3\\stage_simulations\\core1\\";

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		InputStream inStream = null;
		OutputStream outStream = null;

		try {


			String[] params = req.getReader().readLine().split("&");

			String counts = params[0];
			
			File folderA = new File(
					FOLDER_CORE+"simulated\\");
			File[] files = folderA.listFiles();

			if (counts.equalsIgnoreCase("0")) {

				files[0].delete();

			} else {
				inStream = new FileInputStream(files[0]);
				File bfile = new File(
						FOLDER_CORE+"final\\"
								+ files[0].getName());
				outStream = new FileOutputStream(bfile);

				byte[] buffer = new byte[1024];

				int length;
				// copy the file content in bytes
				while ((length = inStream.read(buffer)) > 0) {

					outStream.write(buffer, 0, length);

				}

				inStream.close();
				outStream.close();

				PrintWriter out1 = new PrintWriter(
						new BufferedWriter(
								new FileWriter(
										FOLDER_CORE+"levels.txt",
										true)));

				out1.println(files[0].getName() + " " + counts);
				out1.flush();
				out1.close();

				
				
				PrintWriter out2 = new PrintWriter(
						new BufferedWriter(
								new FileWriter(
										FOLDER_CORE+"coords\\"+files[0].getName(),
										true)));

				out2.println(params[1]);
				out2.flush();
				out2.close();

				// delete the original file
				files[0].delete();


			}

			String clientOrigin = req.getHeader("origin");

			String ipAddress = req.getHeader("x-forwarded-for");
			resp.setHeader("Access-Control-Allow-Origin", clientOrigin);
			resp.setHeader("Access-Control-Allow-Methods", "GET");
			resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
			resp.setHeader("Access-Control-Max-Age", "86400");

			resp.getWriter().print("success");

			System.out.println("File is copied successful!");

		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
